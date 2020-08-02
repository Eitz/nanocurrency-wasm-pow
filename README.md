- Forked from [jaimehgb/RaiBlocksWebAssemblyPoW](https://github.com/jaimehgb/RaiBlocksWebAssemblyPoW)

## nanocurrency-wasm-pow

### Overview

This repo contains a simple Nano Currency PoW implementation compiled to WebAssembly
to boost its performance on browsers. It uses **emscripten** under the hood.

Compiling to WebAssembly, the result is around 10 times faster than a pure JS PoW implementation (e.g.: [RaiBlocksJS](https://github.com/SergiySW/RaiBlocksJS/blob/master/rai.pow.js)).

This basically makes possible to generate proofs of work on modern browsers in a **reasonable time** (see below).

**Average time it takes to compute in a Ryzen 7 3700x**:
- **Send/change blocks:** average of <25 seconds
- **Open/receive blocks:** average of <2.5 seconds

### Usage

To get the proof of work you can simply add the `nano-pow/index.js` to your source code and do:

```html
    <script src="/nano-pow/index.js"></script>
    <script>
      test();

      async function test() {
        const start = Date.now();
        const hash =
          "BD9F737DDECB0A34DFBA0EDF7017ACB0EF0AA04A6F7A73A406191EF80BB20000";

        const proofOfWork = await NanoPow.getProofOfWorkMultiThreaded(
          {
            hash,
            threshold: NanoPow.THRESHOLD__OPEN_RECEIVE,
          }
          // , { workers: 5 } // optionally limit the number of workers, default is number of threads-1
        );

        const end = Date.now();
        const time = (end - start) / 1000;

        console.log({ hash, time, proofOfWork });
      }
    </script>
```

See the files in the `examples` directory for a full overview.

#### Available proof Of Work thresholds

```javascript
  NanoPow.THRESHOLD__SEND_CHANGE,  // "fffffff800000000"
  NanoPow.THRESHOLD__OPEN_RECEIVE, // "fffffe0000000000"
```

If a new threshold is needed in a new version, it can be passed to the function `getProofOfWorkMultiThreaded` as a simple hex string.

### Compiling from source

All the PoW work takes place at <code>nano-pow.cpp</code>.
There is the main loop which calculates the PoW and a function which
can be called from JS and runs the loop (the iterations function).

To compile it to Web Assembly you need to install **emscripten** and add it to your path:

- https://emscripten.org/docs/getting_started/downloads.html

With that done, at the repo directory run:

```bash
$ ./compile.sh
```

It will output 2 files: `nano-pow.js` and `nano-pow.wasm`. To get directions on how to use these files, check the JS files in the `nano-pow` directory.


### Additional help

There are more docs about the emscripten itself [here](http://kripken.github.io/emscripten-site/docs/porting/connecting_cpp_and_javascript/index.html).

### Compatibility

This implementation has just been tested in Chrome (Windows 64bit), Firefox (Windows 64bit) and Chrome (Android) but should also work in
all the [devices supporting WASM](https://developer.mozilla.org/en-US/docs/WebAssembly#Browser_compatibility).
