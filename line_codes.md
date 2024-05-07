s# Comandos y datos django + react

Para visualizar en VSC Ctrl+Shift+V

## Virtual environment

``mkdir djangogirls``
``cd djangogirls``

``python -m venv myvenv``

``source myvenv/Scripts/activate``

``python -m pip install --upgrade pip``


## Si tenemos un archivo con lo necesario a instalar


requirements.txt

    Django==5.0
    djangorestframework
    django-cors-headers

``pip install -r requirements.txt``


## django initialization

django-admin startproject NAME
django-admin startapp NAME

## create super user or admin

python manage.py createsuperuser


## runserver

### Borrar base de datos anterior

rm -f db.sqlite3
rm -r app_name/migrations

### change database

python manage.py makemigrations
python manage.py migrate

python manage.py runserver


## Django description

### admin file

the admin file is used for display the data in the admin webpage implemented by django.

### Configuracion django para react

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "todo",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
]


añadir corsheaders a middleware y rest_framework a las apps con Cors.

además, hay que añadir al final de ```settings.py```

    CORS_ORIGIN_WHITELIST = [
        'http://localhost:3000'
    ]

You whitelisted localhost:3000 because you want the frontend (which will be served on that port) of the application to interact with the API.

### Create models

    class MODELNAME(models.Model):
        
        title = models.CharField(max_length=120)
        description = models.TextField()
        completed = models.BooleanField(default = False)
        
        def __str__(self):
            return self.title


### Show them in the admin webpage


    from models import Leadership

    # Register the Leadership model with the admin site
    @admin.register(Leadership)
    class LeadershipAdmin(admin.ModelAdmin):
        # Define the fields to be displayed in the list view
        list_display = ('name', 'points')

        # Add search functionality based on specified fields
        search_fields = ('name',)

        # Add filters to the right sidebar for points
        list_filter = ('points',)

    #one way to register the model
    admin.site.register(Leadership, LeadershipAdmin)



### Django envia models

Para enviar models al frontend, hay que convertirlos en isntancias de JSON, es por eso que se usan ```serializers```. Hay que crear un archivo ```serializers.py``` en la carpeta de la app.


    from rest_framework import serializers
    from .models import Todo

    class TodoSerializer (serializers.ModelSerializer):
        class Meta:
            model = Todo
            fields = ('id', 'title', 'description', 'completed')

    
    class UpdateDashboard (viewsets.ModelViewSet):
    
    serializer_class = CompanySerializer
    queryset = Company.objects.all()
    
    @action (detail = False, methods = ['GET'], url_path = 'get-companies-details')
    def get_companies_details (self, request, pk = None):
        try:
            companies = Company.objects.all()
            for company in companies:
                stock = yf.Ticker(company.symbol)
                company.per = round( stock.info.get('trailingPE'), 2)
                company.roe = round( stock.info.get('returnOnEquity'), 2)
                company.last_close_value = round( stock.history(period='1d')['Close'].iloc[-1], 4)
                company.magic_number = round( company.per + company.roe, 2)
                company.save()
            
            serializer = CompanySerializer(companies, many = True)
            return Response(serializer.data)
        
        except AttributeError as e:
            print(e)
        
        except Company.DoesNotExist:
            print("Company doesn't exist")
            return Response({"error": "Company not found"}, status=404)



### Crear views rapidas con rest framework

    from django.shortcuts import render
    from rest_framework import viewsets
    from .serializers import TodoSerializer
    from .models import Todo

    class TodoView(viewsets.ModelViewSet):
        serializer_class = TodoSerializer
        queryset = Todo.objects.all()


### Utilizar los urls

    from django.contrib import admin
    from django.urls import path, include
    from rest_framework import routers
    from todo import views

    router = routers.DefaultRouter()
    router.register(r'todos', views.TodoView, 'todo')

    urlpatterns = [
        path('admin/', admin.site.urls),
        path('api/', include(router.urls)),
    ]

el "r" en r'todos' es para usar el texto raw. es decir, sin que se altere al tener backlashes "\" que afectan como "\n".

con esto construimos la API.
This code specifies the URL path for the API. This was the final step that completes the building of the API.

You can now perform CRUD operations on the Todo model. The router class allows you to make the following queries:

/todos/ - returns a list of all the Todo items. CREATE and READ operations can be performed here.
/todos/id - returns a single Todo item using the id primary key. UPDATE and DELETE operations can be performed here.



## frontend

we can create a frontend folder separated from the django folder, the backend. one way to create the frontend is using the following

### install packages

    npx create-react-app frontend
    npm start

Lo siguiente es opcional: Next, install bootstrap and reactstrap to provide user interface tools.

    npm install bootstrap@4.6.0 reactstrap@8.9.0 --legacy-peer-deps

and add to ```index.js``` the following

    import 'bootstrap/dist/css/bootstrap.css';


install   

    npm install axios@0.21.1

and in ```frontend/package.json``` add

    {
    "name": "frontend",
    "version": "0.1.0",
    "private": true,
    "proxy": "http://localhost:8000",

    "proxy": "http://127.0.0.1:8000/",

ponerle ojo a cual hay que utilizar. Ultimamente me ha funcionado más el segundo.

it is useful 

    axios.get("http://localhost:8000/api/todos/")

and now we do

    axios.get("/api/todos/")

para comunicarnos con la base de datos usamos la pagina web api/todos con el import axios

    import axios from "axios";

    axios
        .put(`/api/todos/${item.id}/`, item)
        .then((res) => this.refreshList());

    axios
      .delete(`/api/todos/${item.id}/`)
      .then((res) => this.refreshList());

    axios
      .post("/api/todos/", item)
      .then((res) => this.refreshList());




### Learning react

The ``export`` JavaScript keyword makes this function accessible outside of this file. The ``default`` keyword tells other files using your code that it’s the main function in your file.

    export default function Square() {
      return <button className="square">X</button>;
    }

Instalar sass

    npm install sass

Instalar bootstrap

    npm install react-bootstrap bootstrap

y añadir al html

    <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossorigin></script>
    <script
      src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
      crossorigin></script>
    <script
      src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
      crossorigin></script>


Install framer motion for animations

    npm install framer-motion

Then import
c
    import { motion } from "framer-motion"

    export const MyComponent = ({ isVisible }) => (
        <motion.div animate={{ opacity: isVisible ? 1 : 0 }} />
    )


Install tailwind

    npm install -D tailwindcss
    npx tailwindcss init

Configure tailwind.config.js

    /** @type {import('tailwindcss').Config} */
    module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
    }

Add in another file, ``input.css``, the following:

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

Start the Tailwind CLI build process. It is not necesary to have it working though ...

    npx tailwindcss -i ./src/input.css -o ./src/output.css --watch


Link ``output.css``. Go to the main html and add:

    <link href="path/to/your/generated.css" rel="stylesheet">


Install daisyUI

    npm i -D daisyui@latest

Then add daisyUI to your tailwind.config.js files:

    module.exports = {
    //...
    plugins: [require("daisyui")],
    }

    // daisyUI config (optional - here are the default values)
    daisyui: {
        themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
        darkTheme: "dark", // name of one of the included themes for dark mode
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: ":root", // The element that receives theme color CSS variables
    },

Install react router

        npm install --save react-router-dom


### Chart.js

#### Installation

[npm install chart.js](https://www.chartjs.org/docs/latest/)
[npm install react-chartjs-2](https://react-chartjs-2.js.org/components)
npm install dayjs chartjs-adapter-dayjs-4 --save


### For icons

[npm install lucide-react]{https://lucide.dev/guide/packages/lucide-react}



# Deployment

