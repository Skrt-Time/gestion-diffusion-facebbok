<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>SKRT - Requête Dynamique</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<?php
 /*   if(isset($_POST['fieldSelect'])){
        $selectedField = $_POST['fieldSelect'];

    }
    if(isset($_POST['executeBtn'])){
       creation_table_result();
    }*/
?>

    <div class="container">
        <form id="queryForm" action="#" method="post">
            <select name="fieldSelect" id="fieldSelect" value="<?php echo $selectedField;?>">
                <option value="">Sélectionner un champ</option>
                <option value="senderpsid">senderpsid</option>
                <option value="userid">userid</option>
                <option value="date">date</option>
                <option value="location">location</option>
                <option value="all">all</option>
            </select>

            <div id="conditionInputs"></div>

            <button type="button" id="executeBtn" name="executeBtn" >Effectuer</button>
            <button type="button" id="previewSqlBtn" style="display: none;">Aperçu SQL</button>
        </form>
    </div>

    <div id="sqlCodeDisplay" class="sql-code-display">
        <h2>Code SQL</h2>
        <pre id="sqlCode"></pre>
    </div>
    <table id="resultTable" style="display: none;">
    <thead>
        <tr>
            <th>#</th>
            <!-- Ajouter d'autres en-têtes ici selon vos besoins -->
        </tr>
    </thead>
    <tbody id="resultTableBody">
        <!-- Les lignes seront ajoutées dynamiquement ici -->
    </tbody>
</table>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="script.js"></script>
<?php
//global $selectedField
//$selectedField= $POST['fieldSelect'];*function generateSqlQuery($selectedField) {
    // echo "Champ sélectionné:", $selectedField;
 /*   $sqlQuery = '';
    $tableName = 'facebook_infos.users';
    $dateField = 'date';

    if ($selectedField === 'date') {
        $startDate = $_POST['startDate'];
        $endDate = $_POST['endDate'];
        // echo "Date de début:", $startDate;
        // echo "Date de fin:", $endDate;
        $sqlQuery = "SELECT * FROM $tableName WHERE $dateField BETWEEN '$startDate' AND '$endDate'";
    } else if ($selectedField === 'all') {
        $sqlQuery = "SELECT * FROM $tableName"; // Sélectionner tous les utilisateurs
    } else if ($selectedField) {
        $conditionValue = $_POST['conditionValue'];
        // echo "Valeur de condition:", $conditionValue;
        $sqlQuery = "SELECT * FROM $tableName WHERE $selectedField = '$conditionValue'";
    }
    return $sqlQuery;
}
function creation_table_result(){
    global $selectedField;
    try{
        include("connexion_bd.php");
        $sql=$sql = generateSqlQuery($selectedField);
        $sql = $db ->prepare($sql);
        $sql->execute();
        $result= $db->query($sql);
        $numusers= $result->rowCount();
        echo "<p>$numusers utilisateurs trouvés</p>";
        echo "<table>";
        while ($donnees = $sql->fetch(PDO::FETCH_ASSOC)){
            echo "<tr>";
            $a = $donnees['user_id'];
           echo "<td> $a</td>" ;
           $a = $donnees['nom_utilisateur'];
           echo "<td> $a</td>" ;
           $a = $donnees['psid'];
           echo "<td> $a</td>" ;
           $a = $donnees['localisation'];
           echo "<td> $a</td>" ;
           $a = $donnees['message_1'];
           echo "<td> $a</td>" ;
           $a = $donnees['message_2'];
           echo "<td> $a</td>" ;
           $a = $donnees['date_dernier_message'];
           echo "<td> $a</td>" ;
           $a = $donnees['nombre_total_message'];
           echo "<td> $a</td>" ;
           echo "</tr>";
        }
        echo "</table>";
        $sql -> closeCursor();
} catch (Exception $e){
    die('Erreur pour tableau:' .$e ->getmessage());
}
}*/
 ?>
    
</body>
</html>
