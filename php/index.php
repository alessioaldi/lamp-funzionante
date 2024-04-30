<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/controllers/AlunniController.php';

$app = AppFactory::create();

$app->get('/alunni', "AlunniController:index");
$app->delete('/alunni/{id}', "AlunniController:delete");
$app->post('/alunni', "AlunniController:post");
$app->put('/alunni/{id}', "AlunniController:put");

//Options call
/*$app->options('/alunni/{id}',function(Request $request, Response $response, $args){

    return $response;
});
*/
$app->run();
