import sampleData from "./sampleDataBootstrap";

export function getSassFrameworkData(id) {
  if(id == null || id === undefined){
    return Promise.resolve(sampleData);
  }
}
