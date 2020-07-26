self.importScripts("pow.js");

var ready = false;

Module["onRuntimeInitialized"] = function () {
  postMessage("ready");

  onmessage = function (ev) {
    var PoW = (hash) => Module.ccall("getPowHeavy", "string", ["string"], hash);
    var hash = ev.data;
    //let generate = Module.ccall("getPoW", 'string', ['string'], hash);
    let generate = PoW(hash);

    if (generate != "0000000000000000") {
      console.log(generate + " found");
      postMessage(generate); // Worker return
    } else {
      postMessage(false);
    }
  };
};
