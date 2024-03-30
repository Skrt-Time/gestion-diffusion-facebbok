<?php
// Récupérer la requête SQL envoyée depuis le client
$sqlQuery = $_POST['sqlQuery'];

// Exécuter la requête SQL et récupérer les résultats
// Remplacez cette partie par votre propre logique pour exécuter la requête SQL
// et récupérer les résultats depuis votre base de données

// Exemple de connexion à une base de données MySQL
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "facebook_infos";

// Créer une connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Exécuter la requête SQL
$result = $conn->query($sqlQuery);

// Récupérer les résultats et les stocker dans un tableau
$results = array();
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $results[] = $row;
    }
}

// Fermer la connexion à la base de données
$conn->close();

// Retourner les résultats au format JSON
header('Content-Type: application/json');
echo json_encode($results);
?>
