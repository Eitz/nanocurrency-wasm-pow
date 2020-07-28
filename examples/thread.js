self.importScripts("pow.js");
self.importScripts("core.js");

Module.onRuntimeInitialized = workerInitialize;

onmessage = function (ev) {
  const { hash, type } = ev.data;

  const proofOfWork = type === "heavy" ? getPowHeavy(hash) : getPowLight(hash);

  if (proofOfWork !== "0000000000000000") {
    powFound(hash, type, proofOfWork);
  } else {
    powNotFound();
  }
};

function powNotFound() {
  return postMessage({ message: "failed" });
}

function powFound(hash, type, proofOfWork) {
  return postMessage({ message: "success", hash, type, proofOfWork });
}
