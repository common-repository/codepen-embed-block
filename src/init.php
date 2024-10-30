<?php

if (!defined('ABSPATH')) {
	exit;
}

function codepen_block_assets() { 
	$options = get_option('cp_embed_options');

	wp_register_script(
		'codepen-embed-block-js',
		plugins_url('/dist/blocks.build.js', dirname(__FILE__)),
		array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'),
		2, 
		true // Enqueue the script in the footer.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'codepen-embed-block-js',
		'cgbGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path(__DIR__),
			'pluginDirUrl'  => plugin_dir_url(__DIR__),
			// if not set, make sure returns 1
			'cpDefaultThemeId' => $options['cp_embed_field_pill'] ?? 1,
			// Add more data here that you want to access from `cgbGlobal` object.
		]
	);

	register_block_type(
		'cp/codepen-embed-block', array(
			'editor_script' => 'codepen-embed-block-js',
		)
	);
}

add_action('init', 'codepen_block_assets');



function cp_embed_block_settings_init() {
	register_setting('cp_embed', 'cp_embed_options');

	add_settings_section(
		'cp_embed_section_developers',
		__('Theme Settings', 'cp_embed'), 'cp_embed_section_developers_callback',
		'cp_embed'
	);

	add_settings_field(
		'cp_embed_field_pill',
			__('Theme ID', 'cp_embed'),
		'cp_embed_field_pill_cb',
		'cp_embed',
		'cp_embed_section_developers',
		array(
			'label_for'         => 'cp_embed_field_pill',
			'wporg_custom_data' => 'custom',
		)
	);

	// IMPROVE: Add a "force override theme ID" setting
}

add_action('admin_init', 'cp_embed_block_settings_init');


/**
 * Developers section callback function.
 *
 * @param array $args  The settings array, defining title, id, callback.
 */
function cp_embed_section_developers_callback($args) {
}

/**
 * Pill field callback function.
 *
 * @param array $args
 */
function cp_embed_field_pill_cb($args) {
	$options = get_option('cp_embed_options');
	?>

	<input
		id="<?php echo esc_attr( $args['label_for'] ); ?>"
		type="number"
		name="cp_embed_options[<?php echo esc_attr( $args['label_for'] ); ?>]"
		value="<?php echo isset( $options[ $args['label_for'] ] ) ? ( $options[ $args['label_for'] ] ) : ( '1' ); ?>"
	>

	<p class="description">
		<?php esc_html_e('Integer', 'cp_embed'); ?>
	</p>
	<?php
}

/**
 * Add the top level menu page.
 */
function wporg_options_page() {
	add_options_page(
		'CodePen Block Settings',
		'CodePen Embed',
		'manage_options',
		'cp_embed',
		'cp_embed_options_page_html'
	);
}


/**
 * Register our wporg_options_page to the admin_menu action hook.
 */
add_action('admin_menu', 'wporg_options_page');


/**
 * Top level menu callback function
 */
function cp_embed_options_page_html() {
	if (!current_user_can('manage_options')) {
		return;
	}

	if (isset($_GET['settings-updated'])) {
		add_settings_error('cp_embed_messages', 'cp_embed_message', __('Settings Saved', 'cp_embed'), 'updated');
	}

	settings_errors('cp_embed_messages');
	?>
	<div class="wrap">
		<h1><?php echo esc_html(get_admin_page_title()); ?></h1>
		<form action="options.php" method="post">
			<?php
				settings_fields('cp_embed');
				do_settings_sections('cp_embed');
				submit_button('Save Settings');
			?>
		</form>
	</div>
	<?php
}
