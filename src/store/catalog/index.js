import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: []
    }
  }

  async load(recentPage, step) {
    const url = `/api/v1/articles?limit=${step}&skip=${recentPage * 10}&fields=items(_id, title, price),count`
    const response = await fetch(url);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
