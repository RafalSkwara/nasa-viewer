# SkyDelve

Small React app which uses NASA's open API to get some interesting data and images and lets user interact with the data, hopefully in interesting ways

## Tech stack

Some of the technologies and tools used:
- React
- Redux
- React-Router
- SASS (using Dart Sass)
- Webpack 4
- JavaScript ES6 (of course)
- Bootsrap 4 grid

## Functionalities

### Astronomy picture of the day

A part of the app that allows user to choose the date and see the Astronomy picture of the day chosen by NASA then.

### EPIC

The EPIC API provides information on the daily imagery collected by DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument. In the app user can choose the date and type of photograph to display (natural or enhanced) and browse through different view points either using buttons or swiping on touch devices.

### NEO Feed

This section uses NASA's Neo API to provide details about every registered asteroid. The user can choose the date of closest approach to Earth and the app will display matching asteroids within 7 days of chosen day.

### Mars Rovers Photos

Photo viewer displaying all of the photographs taken by NASA's Martian rovers. The photos are filtered by camera and sorted by sol (Martian day) since rover landing. Touch swiping available.

## Development Notes

### Node.js Compatibility

This project is configured to work with Node.js 12 (as specified in `.nvmrc`) and also supports newer Node.js versions (17+). The npm scripts automatically detect the Node.js version and apply the `--openssl-legacy-provider` flag only when running on Node.js 17 or higher, where it's required due to OpenSSL 3.0 changes.

### SASS Implementation

This project uses Dart Sass (the `sass` package) instead of node-sass for SASS compilation. Dart Sass is the primary implementation of SASS and is more actively maintained than node-sass.

#### Future Considerations

There are some deprecation warnings that will need to be addressed in future updates:

1. The legacy JS API used by sass-loader is deprecated and will be removed in Dart Sass 2.0.0.
2. Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0. These should be migrated to @use and @forward rules.

For more information on these deprecations, see:
- https://sass-lang.com/d/legacy-js-api
- https://sass-lang.com/d/import
