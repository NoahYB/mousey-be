
function createMap(width, height) {
    let entities = [];
    let ground = Bodies.rectangle(width - width / 2, height, width, 88, { isStatic: true });
    entities.push(Bodies.rectangle(0, height - height / 2, 88, height, { isStatic: true }));
    entities.push(Bodies.rectangle(width, height - height / 2, 88, height, { isStatic: true }));
    entities.push(Bodies.rectangle(0 + width / 2, 0, width, 88, { isStatic: true }));

    entities.push(Bodies.rectangle(0, 300, width / 3, 88, { isStatic: true }));
    ground.label = 'ground';
    entities.push(ground);
    return entities;
}
