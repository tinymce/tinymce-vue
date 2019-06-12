# 2.1.0 (2019-06-05)
* Changed the CDN URL to use `cdn.tiny.cloud`

# 2.0.0 (2019-02-11)
* Changed default cloudChannel to `'5'`.

# 1.1.2 (2019-01-09)
* Updated changelog to show how you have to add `.default` to commonjs require.

# 1.1.1 (2019-01-09)
* Improved uuid function. Patch contributed by fureweb-com.

# 1.1.0 (2018-10-01)
* Added functionality to bind to `disabled` property to set editor into readonly state.

# 1.0.9 (2018-09-03)
* Fixed broken links in readme.

# 1.0.8 (2018-05-10)
* Added `undo` and `redo` to the events triggering sending out content to `v-model`.

# 1.0.7 (2018-04-26)
* Added null check before removing editor to check that tinymce is actually available.

# 1.0.6 (2018-04-11)
* Removed `cloudChannel` prop validation.

# 1.0.5 (2018-04-06)
* Removed onPreInit shorthand as it never worked.

# 1.0.4 (2018-04-06)
* Fixed bug with onInit never firing.

# 1.0.3 (2018-04-03)
* Fixed bug with value watcher getting out of sync.

# 1.0.2 (2018-02-16)
* Fixed bug where is wasn't possible to set inline in the init object, only on the shorthand.

# 1.0.1 (2018-02-08)
* Fixed binding timing issues by moving the binding to after the editor has initialized. 

# 1.0.0 (2018-01-16)
* Initial release