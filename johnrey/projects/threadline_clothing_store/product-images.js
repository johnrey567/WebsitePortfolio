const originalRenderAdmin = renderAdmin;
const originalRenderTracking = renderTracking;

function productArtwork(product, imageClass = 'product-photo') {
  if (product.image) {
    return `<img class="${imageClass}" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">`;
  }
  return garment(product.type, product.color);
}

function imageErrorMessage(error) {
  if (error && (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
    return 'Browser storage is full. Remove some large product photos and try again.';
  }
  return `Could not save the product photo${error && error.message ? `: ${error.message}` : '.'}`;
}

async function prepareProductImage(file) {
  if (!file || !file.type.startsWith('image/')) {
    throw new Error('Choose a valid image file.');
  }
  if (file.size > 12 * 1024 * 1024) {
    throw new Error('Image files must be 12 MB or smaller.');
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1400 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext('2d');
  if (!context) {
    bitmap.close();
    throw new Error('Your browser could not process this image.');
  }

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL('image/jpeg', 0.82);
}

function renderProducts() {
  const query = $('searchInput').value.trim().toLowerCase();
  const category = $('categoryFilter').value;
  const products = state.products.filter(product =>
    (category === 'All' || product.category === category) &&
    product.name.toLowerCase().includes(query)
  );

  $('productGrid').innerHTML = products.map(product =>
    `<article class="product-card"><div class="product-image" style="background:linear-gradient(145deg,#eee9e0,${escapeHtml(product.color)}55)">${product.tag ? `<span class="product-label">${escapeHtml(product.tag)}</span>` : ''}${productArtwork(product)}<button class="quick-add" data-product="${product.id}">VIEW DETAILS ↗</button></div><div class="product-info"><div><p class="product-name">${escapeHtml(product.name)}</p><p class="product-meta">${escapeHtml(product.category)} · ${product.stock > 0 ? `${product.stock} in stock` : 'Sold out'}</p><div class="product-rating">${avgRating(product.id) ? `★ ${avgRating(product.id)} · ${state.reviews.filter(review => review.productId === product.id).length} review(s)` : '☆ No reviews yet'}</div></div><span class="product-price">${money(product.price)}</span></div></article>`
  ).join('');
  $('emptyProducts').classList.toggle('hidden', products.length > 0);
  $('productGrid').querySelectorAll('[data-product]').forEach(button => {
    button.onclick = () => openProduct(button.dataset.product);
  });
}

function openProduct(id) {
  const product = productById(id);
  if (!product) return;
  selectedProduct = product;
  selectedSize = product.sizes[0];
  const average = avgRating(product.id);
  $('modalContent').innerHTML = `<p class="eyebrow">${escapeHtml(product.category.toUpperCase())} / THREADLINE</p><h3 id="modalTitle">${escapeHtml(product.name)}</h3><div class="product-detail"><div class="detail-art" style="background:linear-gradient(145deg,#eee9e0,${escapeHtml(product.color)}66)">${productArtwork(product, 'detail-photo')}</div><div><p class="detail-description">${escapeHtml(product.description)}</p><div class="price-large">${money(product.price)}</div><p class="product-meta">${product.stock > 0 ? `${product.stock} pieces available` : 'Currently sold out'}</p><label class="option-label">SELECT SIZE</label><div class="option-row">${product.sizes.map(size => `<button class="option ${size === selectedSize ? 'selected' : ''}" data-size="${escapeHtml(size)}">${escapeHtml(size)}</button>`).join('')}</div><button class="button button-dark" id="addToCartBtn" ${product.stock < 1 ? 'disabled' : ''}>${product.stock < 1 ? 'SOLD OUT' : 'ADD TO BAG'} <span>↗</span></button><p class="product-rating">${average ? `★ ${average} (${state.reviews.filter(review => review.productId === product.id).length} reviews)` : '☆ No reviews yet'}</p></div></div>`;
  $('modalBackdrop').classList.remove('hidden');
  $('modalContent').querySelectorAll('[data-size]').forEach(button => {
    button.onclick = () => {
      selectedSize = button.dataset.size;
      $('modalContent').querySelectorAll('[data-size]').forEach(option => {
        option.classList.toggle('selected', option === button);
      });
    };
  });
  $('addToCartBtn').onclick = () => {
    const item = cart.find(entry => entry.productId === product.id && entry.size === selectedSize);
    if (item && item.qty >= product.stock) {
      toast('Not enough stock available.');
      return;
    }
    if (item) item.qty++;
    else cart.push({ productId: product.id, size: selectedSize, qty: 1 });
    renderCart();
    closeModal();
    showDrawer('cartDrawer');
    toast('Added to your bag.');
  };
}

function renderCart() {
  const host = $('cartItems');
  if (!cart.length) {
    host.innerHTML = '<div class="empty-cart">Your bag is looking a little empty.<br><br><a class="text-link" href="#shop" id="continueShopping">Explore the collection ↗</a></div>';
    $('cartSubtotal').textContent = money(0);
    updateCartCount();
    const link = $('continueShopping');
    if (link) link.onclick = closeDrawers;
    return;
  }

  host.innerHTML = cart.map(item => {
    const product = productById(item.productId);
    if (!product) return '';
    return `<div class="cart-item"><div class="cart-thumb">${productArtwork(product, 'cart-photo')}</div><div><h4>${escapeHtml(product.name)}</h4><p>Size: ${escapeHtml(item.size)} · ${money(product.price)}</p><div class="qty-controls"><button data-qty="-1" data-key="${item.productId}|${escapeHtml(item.size)}">−</button><span>${item.qty}</span><button data-qty="1" data-key="${item.productId}|${escapeHtml(item.size)}">+</button></div></div><button class="remove-btn" data-remove="${item.productId}|${escapeHtml(item.size)}">Remove</button></div>`;
  }).join('');
  $('cartSubtotal').textContent = money(cart.reduce((sum, item) => sum + productById(item.productId).price * item.qty, 0));
  updateCartCount();
  host.querySelectorAll('[data-qty]').forEach(button => {
    button.onclick = () => changeQty(button.dataset.key, Number(button.dataset.qty));
  });
  host.querySelectorAll('[data-remove]').forEach(button => {
    button.onclick = () => {
      cart = cart.filter(item => `${item.productId}|${item.size}` !== button.dataset.remove);
      renderCart();
    };
  });
}

window.renderAdmin = function renderAdminWithPhotos() {
  originalRenderAdmin();
  if (activeAdminTab !== 'inventory') return;

  const table = $('adminContent').querySelector('.admin-dark-table');
  if (!table) return;
  const header = document.createElement('th');
  header.textContent = 'Photo';
  table.tHead.rows[0].insertBefore(header, table.tHead.rows[0].cells[1]);

  table.tBodies[0].querySelectorAll('tr').forEach(row => {
    const saveButton = row.querySelector('[data-saveproduct]');
    const product = productById(saveButton.dataset.saveproduct);
    const cell = document.createElement('td');
    cell.innerHTML = `<div class="admin-product-photo-wrap">${product.image ? `<img class="admin-product-preview" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">` : '<span class="admin-product-placeholder">No photo</span>'}<label class="admin-upload-button">${product.image ? 'Change photo' : 'Add photo'}<input type="file" accept="image/*" data-product-image="${product.id}" aria-label="Upload a photo for ${escapeHtml(product.name)}"></label></div>`;
    row.insertBefore(cell, row.cells[1]);
  });

  table.querySelectorAll('[data-product-image]').forEach(input => {
    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;
      const product = productById(input.dataset.productImage);
      if (!product) return;
      try {
        const previousImage = product.image;
        product.image = await prepareProductImage(file);
        try {
          save();
        } catch (error) {
          product.image = previousImage;
          toast(imageErrorMessage(error));
          return;
        };
        renderAdmin();
        renderProducts();
        toast('Product photo updated.');
      } catch (error) {
        toast(error.message || 'Could not load this image.');
      }
    };
  });
}

function openAddProduct() {
  $('modalContent').innerHTML = `<p class="eyebrow">INVENTORY</p><h3 id="modalTitle">Add a product</h3><form class="form-stack" id="addProductForm"><label>Product name<input name="name" required maxlength="80"></label><label>Category<select name="category"><option>Tops</option><option>Bottoms</option><option>Outerwear</option><option>Accessories</option></select></label><label>Price (₱)<input type="number" name="price" min="0" required></label><label>Starting stock<input type="number" name="stock" min="0" step="1" required></label><label>Display color<input type="color" name="color" value="#9ba982"></label><label>Style type<select name="type"><option value="shirt">T-shirt</option><option value="pants">Pants</option><option value="jacket">Jacket</option><option value="cap">Accessory</option></select></label><label>Description<textarea name="description" rows="3"></textarea></label><label>Product photo (optional)<input type="file" name="image" accept="image/*"><small class="photo-help">JPG, PNG, or other browser-supported image · max 12 MB</small></label><div class="product-upload-preview hidden" id="productUploadPreview"></div><button class="button button-dark">ADD TO INVENTORY ↗</button></form>`;
  $('modalBackdrop').classList.remove('hidden');

  const form = $('addProductForm');
  const imageInput = form.elements.image;
  let productImage = '';
  imageInput.onchange = async () => {
    const file = imageInput.files[0];
    if (!file) return;
    try {
      productImage = await prepareProductImage(file);
      const preview = $('productUploadPreview');
      preview.innerHTML = `<img src="${escapeHtml(productImage)}" alt="Product photo preview"><span>${escapeHtml(file.name)}</span>`;
      preview.classList.remove('hidden');
    } catch (error) {
      productImage = '';
      imageInput.value = '';
      $('productUploadPreview').classList.add('hidden');
      toast(error.message || 'Could not load this image.');
    }
  };

  form.onsubmit = event => {
    event.preventDefault();
    const data = new FormData(form);
    const product = {
      id: Math.max(0, ...state.products.map(item => item.id)) + 1,
      name: String(data.get('name')).trim(),
      category: String(data.get('category')),
      price: Number(data.get('price')),
      stock: Number(data.get('stock')),
      color: String(data.get('color')),
      tag: 'NEW',
      type: String(data.get('type')),
      description: String(data.get('description')).trim(),
      sizes: ['S', 'M', 'L', 'XL'],
      ...(productImage ? { image: productImage } : {})
    };
    state.products.push(product);
    try {
      save();
    } catch (error) {
      state.products.pop();
      toast(imageErrorMessage(error));
      return;
    }
    closeModal();
    renderProducts();
    renderAdmin();
    toast('Product added to inventory.');
  };
}

window.renderTracking = function renderTrackingWithPhotos(order) {
  originalRenderTracking(order);
  if (!order) return;
  $('trackingResult').querySelectorAll('.tracking-item').forEach((itemElement, index) => {
    const product = productById(order.items[index].productId);
    if (product && product.image) {
      itemElement.querySelector('.tracking-thumb').innerHTML = productArtwork(product, 'tracking-photo');
    };
  });
}

renderProducts();
