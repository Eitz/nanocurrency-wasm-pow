function getPowWorkers(
  threads = self.navigator.hardwareConcurrency - 1,
  worker_path = ""
) {
  const workers = [];
  for (let i = 0; i < threads; i++) {
    workers[i] = new Worker(worker_path + "thread.js");
  }
  return workers;
}

function terminateWorkers(workers) {
  for (let worker of workers) {
    worker.terminate();
  }
}

function powCallback(workers, hash, callbackStarted, callbackFinished) {
  if (hash.length == 64 && typeof callbackFinished === "function") {
    for (let worker of workers) {
      worker.onmessage = function (e) {
        const { message, ...result } = e.data;
        switch (message) {
          case "ready":
            worker.postMessage({ hash, type: "heavy" });
            callbackStarted();
            break;
          case "failed":
            worker.postMessage({ hash, type: "heavy" });
            break;
          case "success":
            terminateWorkers(workers);
            callbackFinished(result);
        }
      };
    }
  }
}
