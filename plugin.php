<?php
/**
 * Plugin Name: CodePen Embed Block 
 * Description: Embeds Pens
 * Author: Chris Coyier
 * Version: 1.1.0
 * Tested up to: 6.4.1
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
