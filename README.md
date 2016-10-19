# js-typed-arrays-performance

### Results
| Operation     | Normal Array  | Int8Array     |
| ------------- |:-------------:| -------------:|
| *Sort*        | 49.10 ops/sec | 48.02 ops/sec |
| *Read*        | 5,214,320 ops/sec              |  5,265,962 ops/sec          |
| *Write*       | **4,465,988 ops/sec**              | ~~4,182,763 ops/sec~~           |
| *Clone*       | ~~1,271 ops/sec~~              | ***3,959 ops/sec***          |


| Operation     | Normal Array  | Uint8Array |
| ------------- |:-------------:| ----------:|
| *Sort*        | 44.16 ops/sec | 43.54 ops/sec  |
| *Read*        | 5,416,085 ops/sec | 5,257,924 ops/sec   |
| *Write*       | ***4,720,822 ops/sec***              | ~~4,012,445 ops/sec~~           |
| *Clone*       | ~~1,287 ops/sec~~               | ***1,725 ops/sec***            |


| Operation     | Normal Array  | Uint8ClampedArray |
| ------------- |:-------------:| ----------:|
| *Sort*        | 52.82 ops/sec               | 48.43 ops/sec            |
| *Read*        | 5,317,178 ops/sec              | 5,512,177 ops/sec           |
| *Write*       | ***4,769,089 ops/sec***               | ~~4,158,825 ops/sec~~           |
| *Clone*       | ~~1,006 ops/sec~~               | ***3,027 ops/sec***           |


| Operation     | Normal Array  | Int16Array |
| ------------- |:-------------:| ----------:|
| *Sort*        | 10.79 ops/sec | 8.02 ops/sec  |
| *Read*        | 5,264,329 ops/sec              | 5,219,599 ops/sec             |
| *Write*       | **4,735,680 ops/sec**              | ~~3,771,672 ops/sec~~            |
| *Clone*       | ~~1,329 ops/sec~~              | **1,887 ops/sec**           |


| Operation     | Normal Array  | Uint16Array |
| ------------- |:-------------:| ----------:|
| *Sort*        | **10.59 ops/sec**               | ~~3.26 ops/sec~~            |
| *Read*        | **5,454,440 ops/sec**              | ~~4,998,838 ops/sec~~           |
| *Write*       | **4,741,021 ops/sec**              | ~~3,544,992 ops/sec~~           |
| *Clone*       | ~~1,059 ops/sec~~              | **3,323 ops/sec**           |


| Operation     | Normal Array  | Int32Array |
| ------------- |:-------------:| ----------:|
| *Sort*        |  9.39 ops/sec             | 9.69 ops/sec            |
| *Read*        |  5,398,342 ops/sec             | 5,459,182 ops/sec            |
| *Write*       | **4,806,211 ops/sec**              | ~~4,085,358 ops/sec~~            |
| *Clone*       | ~~1,161 ops/sec~~              | **2,692 ops/sec**           |


| Operation     | Normal Array  | Uint32Array |
| ------------- |:-------------:| ----------:|
| *Sort*        |  4.40 ops/sec             | 4.95 ops/sec            |
| *Read*        |  5,163,662 ops/sec             | 5,208,767 ops/sec           |
| *Write*       |  **4,852,699 ops/sec**             | ~~4,082,368 ops/sec~~           |
| *Clone*       |  ~~1,214 ops/sec~~               | **2,711 ops/sec**            |


| Operation     | Normal Array  | Float32Array |
| ------------- |:-------------:| ----------:|
| *Sort*        | 3.82 ops/sec              | 5.10 ops/sec             |
| *Read*        | 4,651,893 ops/sec              | 4,851,970 ops/sec             |
| *Write*       | **4,775,146 ops/sec**              | ~~3,815,358 ops/sec~~           |
| *Clone*       | ~~1,059 ops/sec~~              | **1,604 ops/sec**            |


| Operation     | Normal Array  | Float64Array |
| ------------- |:-------------:| ----------:|
| *Sort*        | 3.40 ops/sec             | 2.91 ops/sec           |
| *Read*        | 5,357,066 ops/sec              | 5,298,533 ops/sec            |
| *Write*       | 4,263,899 ops/sec              | 3,783,920 ops/sec           |
| *Clone*       | 1,297 ops/sec               |  1,266 ops/sec          |

### Development
```
git clone https://github.com/ryanmcdermott/typed-arrays.git
npm install
npm start
```

Open the web browser and navigate to `http://localhost:8888/`

### Build Production
To build a static version of site that is outputted to the `/docs` folder, run:
```
npm run build
```
