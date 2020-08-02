- Forked from [jaimehgb/RaiBlocksWebAssemblyPoW](https://github.com/jaimehgb/RaiBlocksWebAssemblyPoW)

**Currently a work in progress.**, use for reference only.

## nanocurrency-wasm-pow

### Overview

This repo contains a simple Nano Currency PoW implementation compiled to WebAssembly
to boost its performance on browsers. It uses **emscripten** under the hood.

Compiling to WebAssembly, the result is around 10 times faster than a pure JS PoW implementation (e.g.: [RaiBlocksJS](https://github.com/SergiySW/RaiBlocksJS/blob/master/rai.pow.js)).

This basically makes possible to generate proofs of work on modern browsers in a reasonable time.

### Compiling from source

All the PoW work takes place at <code>nano-pow.cpp</code>.
There is the main loop which calculates the PoW and a function which
can be called from JS and runs the loop (the iterations function).

To compile it to Web Assembly you need to install **emscripten**:

- https://emscripten.org/docs/getting_started/downloads.html

With that done, at the repo directory run:

```bash
$ ./compile.sh
```

It will output 2 files: `nano-pow.js` and `nano-pow.wasm`, place those files together
somewhere and include `nano-pow.js` in your html as usual.

To call the "getPoW" function you can do:

```javascript
const hash = "BD9F737DDECB0A34DFBA0EDF7017ACB0EF0AA04A6F7A73A406191EF80BB290AD";
const pow = getPoW(hash, threshold);
console.log(pow);
```

What that function does is to try to find a valid PoW in 5,000,000 iterations.
If it finds it it will return the result as a hex string.
If it does not find it, will return a 64bit hex 0 (`0000000000000000`).

To call the function, you have to wait for WebAssembly to load and compile.

This is signaled by the following event:

```javascript
Module["onRuntimeInitialized"] = function () {
  // Its all fine here
  // do stuff
  // ...
};
```

There are more docs about the Module API and emscripten itself [here](http://kripken.github.io/emscripten-site/docs/porting/connecting_cpp_and_javascript/index.html).

### Compatibility

This implementation has just been tested in Chrome (Windows 64bit), Firefox (Windows 64bit) and Chrome (Android) but should also work in
all the [devices supporting WASM](https://developer.mozilla.org/en-US/docs/WebAssembly#Browser_compatibility).

### Examples

There are examples in the `/examples` folder.

One of them uses webworkers to multithread the PoW. The other one is single threaded.
