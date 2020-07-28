function getPowLight() {
  console.log("uninmplemented");
}
function getPowHeavy() {
  console.log("uninmplemented");
}

// Module.onRuntimeInitialized = function () {

// };

function workerInitialize() {
  getPowLight = (hash) =>
    Module.ccall("getPowLight", "string", ["string"], hash);
  getPowHeavy = (hash) =>
    Module.ccall("getPowHeavy", "string", ["string"], hash);

  postMessage({ message: "ready" });
}
