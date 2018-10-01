# 1.1.0 
* Added functionality to bind to `disabled` property to set editor into readonly state.

# 1.0.9
* Fixed broken links in readme.

# 1.0.8
* Added `undo` and `redo` to the events triggering sending out content to `v-model`.

# 1.0.7
* Added null check before removing editor to check that tinymce is actually available.

# 1.0.6
* Removed `cloudChannel` prop validation.

# 1.0.5
* Removed onPreInit shorthand as it never worked.

# 1.0.4
* Fixed bug with onInit never firing.

# 1.0.3
* Fixed bug with value watcher getting out of sync.

# 1.0.2
* Fixed bug where is wasn't possible to set inline in the init object, only on the shorthand.

# 1.0.1
* Fixed binding timing issues by moving the binding to after the editor has initialized. 

# 1.0.0
* Initial release
