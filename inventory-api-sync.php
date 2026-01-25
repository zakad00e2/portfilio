<?php
/*
Plugin Name: Inventory API Sync
Description: Sync products from external inventory API (Read Only)
Version: 1.0
Author: Nour
*/

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Add admin menu
 */
add_action('admin_menu', function () {
    add_menu_page(
        'Inventory API Sync',
        'Inventory Sync',
        'manage_options',
        'inventory-api-sync',
        'inventory_api_sync_page'
    );
});

/**
 * Admin page content
 */
function inventory_api_sync_page() {
    echo '<div class="wrap">';
    echo '<h1>Inventory API Sync – Test</h1>';

    if (isset($_POST['test_api'])) {
        inventory_api_test();
    }

    echo '<form method="post">';
    echo '<input type="submit" name="test_api" class="button button-primary" value="Test API Connection">';
    echo '</form>';
    echo '</div>';
}

/**
 * Test API fetch
 */
function inventory_api_test() {
    $url = 'https://sir-aldawaa.smartsoft-app.com/api/Items/GetItems?PageNumber=1';

    $response = wp_remote_get($url, [
        'timeout' => 30,
    ]);

    if (is_wp_error($response)) {
        echo '<p style="color:red;">API Error</p>';
        return;
    }

    $body = wp_remote_retrieve_body($response);
    $data = json_decode($body, true);

    if (!$data) {
        echo '<p style="color:red;">Invalid JSON response</p>';
        return;
    }

    echo '<h2>Sample Data (First 5 Items)</h2>';
    echo '<pre>';
    print_r(array_slice($data, 0, 5));
    echo '</pre>';
}
