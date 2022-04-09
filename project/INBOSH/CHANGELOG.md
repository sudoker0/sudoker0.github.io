# Changelog
All changes made to `INBOSH` will be recorded and put into the changelog.

Please note that I/we might not record all of the changes (like when the changes are so small that it isn't worth putting in or when I/we forgot to put the changes).

Also, all timestamp is formatted as MM/DD/YYYY.

> ## **Alpha**
## [0.0.6] - 01/12/2022
### Added
 - Ability to use comment (by placing a pound sign ("#") at the beginning of the line)
 - Documentation

### Changed
 - Cleanup CSS code for better consistency
 - A bit of UI change to the details tag
 - Now required a license key to use (not a serious thing, will be removed after official release, and it's not that hard to bypass anyway)

## [0.0.5] - 01/05/2022
### Added
 - Padding around the dropdown menu and the dropdown button to make it look better.
 - Icon at the start of the menu bar.
 - Help menu button and About section.
 - Ability to run multiple command on one line using the `;` character (currently it's really basic).

### Changed
 - In the settings page, input for color changed from `input[type=text]` to `input[type=color]`.
 - Improve error handling a bit.

## [0.0.4] - 01/04/2022
### Added:
 - "Import and run script" feature
 - Changelog

### Fixed:
 - A bug where certain character inside a string get interpreted as part of the function instead of just text (like the semicolon or the quote)
 - The "START" button on the boot screen will only start after when the user focus on the page (which can make user have to wait around 3 seconds longer)

## [0.0.3] - 01/03/2022
**[NO DATA]**

## [0.0.2] - 01/03/2022
### Added:
 - Auto-migrate the config data to latest version
### Fixed:
 - A bug where the default value of the input for the setting box might get inserted instead of the default config or the saved config.

## [0.0.1] - 01/03/2022
### Added:
 - The project itself