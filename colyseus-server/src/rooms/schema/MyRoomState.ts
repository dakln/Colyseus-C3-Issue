import { Schema, MapSchema, ArraySchema, type } from "@colyseus/schema";

class Instance extends Schema {
  constructor(id: number) {
    super();
    this.id = id;
  }
  @type("number") id: number;
  @type("number") value: number = 0;
}

class World extends Schema {
  @type("number") value: number = 0;
}

export class MyRoomState extends Schema {
  constructor() {
    super();
    // Fill 'instances' MapSchema
    for (let i = 0 ; i < 5 ; i++) {
      this.instances.set('instance_' + i, new Instance(i));
    }
  }
  @type( World ) world: World = new World();
  @type({ map: Instance }) instances = new MapSchema<Instance>();


  update() {
    // Changing world.value
    this.world.value += 1;

    // Changing instance.id
    this.instances.forEach((instance: Instance) => {
      instance.value += 0.5;
    })
  }
}
