<?php 
    //error_reporting (E_ALL ^ E_NOTICE);//PHP compiler will show all errors except 'Notice.'

    // $email = $_POST["email"];
    // $message = $_POST["message"];

    if(isset($_POST['email'])){
        $email = $_POST['email']; 
    }else{
            $email = "Email not set in GET Method";
    }
    if(isset($_POST['message'])){
            $message = $_POST['message']; 
    }else{
            $message = "<br>Message not set in GET Method";
    }

    if(!empty($email) && !empty($message)){
        // MySQL
        // ....

        $msg = 'Email: '.$email.'
                Message: '.$message;

        //mail
        $to = "arifb1999@outlook.com";
        $subject = "Charities Contact Form";
        $headers = "From: arifbakar7@outlook.com";

        if(mail($to,$subject,$msg,$headers)){
            echo 'success';
        }
    }

    echo $email;
    echo $message;