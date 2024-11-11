# Changelog


### :label: Version 1.0

- [x] Added functionality to remove existing styles from SVGs.
- [x] If an SVG contains a `<style>` tag, its values are now displayed as placeholders for easy reference.

### :label: Version 1.1 (latest)

- [x] Introduced a Settings page with options for SVG handling:
  - [x] Option to duplicate SVGs to a specified location (Obsidian attachment folder or a custom path).
  - [x] Option to either modify the SVG in place or work on a duplicate version.
- [x] Added a feature to display the drawable SVG tags present in the file, allowing users to edit only the existing tags (e.g., `<path>`).

* :wrench::white_check_mark: **Patch 1.1.1**: In response to [#4436<sup>:eyes:</sup><sub></sub>](https://github.com/obsidianmd/obsidian-releases/pull/4436#issuecomment-2415669063), this patch fixed HTML inline styling inside the JavaScript file. Additionally this plugin programatically looks for Obsidian's configuration folder instead of hardcoding it. 

* :wrench::white_check_mark: **Patch 1.1.2**: In response to [#4436<sup>:eyes:</sup><sub></sub>](https://github.com/obsidianmd/obsidian-releases/pull/4436#issuecomment-2451720547), this patch fixed UI, naming, code style, and API usage issues. 


### :label: Version 1.2 (upcomming)

- [ ] Implement a Preset Manager within the settings page.
- [ ] Enable users to load, save, and remove style presets from both the settings and plugin interface.
- [ ] Improve the UI/UX of the tag style editor for a more streamlined experience.
