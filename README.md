<p align="center"><img src="https://www.11ty.dev/img/logo-github.svg" width="200" height="200" alt="11ty Logo"></p>

# IndieWeb Avatar API

A runtime service to extract avatar images from:

1. `<link rel="apple-touch-icon">`
1. `<link rel="apple-touch-icon-precomposed">`
1. `<link rel="icon">`
1. `favicon.ico` (added September 20, 2021)
1. `favicon.ico` that isn’t an `.ico` file (added December 1, 2023)
1. First `<img>` in `<header>` (added December 1, 2023)
1. TODO: Support Data URIs in attribute values. (e.g. https://joshcrain.io)
1. TODO: `<link rel="mask-icon">`
1. TODO (maybe): `<link rel="manifest">`
1. TODO (maybe): `<meta name="msapplication-config">`

All `rel` lookups match against attribute values that are space separated lists.

Update July 22, 2024: Supports `svg` favicons but converts to `png` for performance reasons (some folks had _huge_ SVG favicons).

## Usage

URLs have the formats:

```
/:url/
```

* `url` must be URI encoded.

