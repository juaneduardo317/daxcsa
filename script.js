function createTree(data, level = 0) {
  let elem = document.createElement('div');
  elem.classList.add('tree-node');
  let card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML ='<strong>'+data.full_name+'</strong>';

  const tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');
  tooltip.innerHTML = `
    <table>
      <tr><td><strong>Name:</strong></td><td>${data.full_name}</td></tr>
      <tr><td><strong>Username:</strong></td><td>${data.username}</td></tr>
      <tr><td><strong>Status:</strong></td><td>${data.status}</td></tr>
      <tr><td><strong>Product:</strong></td><td>${data.product_name}</td></tr>
      <tr><td><strong>Category:</strong></td><td>${data.category_name}</td></tr>
    </table>
  `;
  card.appendChild(tooltip);
  elem.appendChild(card);
  if(existsChildren(data)){
    const elem_children = document.createElement('div');
    elem_children.classList.add('tree-children');

    if(level >= 1){
      elem_children.classList.add('collapsed');
    }

    const left_child = data.children.find(child => child.binary_placement === 'Left');
    const right_child = data.children.find(child => child.binary_placement === 'Right');

    if(left_child){
      elem_children.classList.add('tree-node-slot');
      elem_children.appendChild(createTree(left_child,level + 1));
    }

    if(right_child){
      elem_children.classList.add('tree-node-slot');
      elem_children.appendChild(createTree(right_child,level + 1));
    }
    elem.appendChild(elem_children);

    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      elem_children.classList.toggle('collapsed');
    });

    card.addEventListener('mouseover',(e) => {
      console.log('Hola');
    });
  }

  return elem;
}

function existsChildren(object){
  return Array.isArray(object.children) && object.children.length > 0;
}

fetch('./daxcsa.json')
  .then(response => response.json())
  .then(data => {
    const tree = createTree(data.data.attributes[0]);
    document.getElementById('tree-container').append(tree);
  })
  .catch(error => console.error('Error al cargar JSON:', error));