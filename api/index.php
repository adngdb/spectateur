<?php
require 'vendor/autoload.php';

use Rhumsaa\Uuid\Uuid;

require_once 'include/db_connect.php';

$app = new \Slim\Slim();

$db = new DbConnect();
$conn = $db->connect();

$app->get('/reports/:uuid', function ($uuid) use ($conn) {
    global $conn;

    $stmt = $conn->prepare("SELECT model, controller FROM sp_reports WHERE uuid = ?");
    $stmt->bind_param("s", $uuid);
    if ($stmt->execute()) {
        $stmt->bind_result($model, $controller);
        $report = false;
        while ($stmt->fetch()) {
            $report = array(
                'model' => $model,
                'controller' => $controller
            );
        }
        $stmt->close();
        // var_dump($report);
        echo json_encode($report);
    } else {
        echo NULL;
    }
});

$app->post('/reports', function() use ($app, $conn) {
    $model = $app->request->post('model');
    $controller = $app->request->post('controller');

    $uuid4 = Uuid::uuid4();
    $uuid = $uuid4->toString();

    $stmt = $conn->prepare("INSERT INTO sp_reports(uuid, model, controller) values(?, ?, ?)");
    $stmt->bind_param("sss", $uuid, $model, $controller);

    $result = $stmt->execute();

    $stmt->close();

    if ($result) {
        echo $uuid;
    } else {
        echo false;
    }
});

$app->run();
