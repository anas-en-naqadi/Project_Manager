<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #dddddd;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #4CAF50;
            color: #ffffff;
            padding: 10px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }

        .content {
            margin: 20px 0;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #888888;
        }
    </style>
</head>

<body>
    <div class="container">

        <div class="content">
            <h2>Hy {{ $details['data']['employee_name'] }}</h2>
            <p>{!! $details['data']['message'] !!}</p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} {{$details['company_name']}}. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
