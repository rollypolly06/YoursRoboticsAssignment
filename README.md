# YoursRoboticsAssignment
This is the take-home assignment for the role of software engineer at Yours Robotics.

# Setup Backend
Version of Python 3.10+

1. Set up a virtual environment
```
cd backend
python -m venv venv
```

2. Activate the virtual env
```
# For windows terminal
venv\Scripts\activate

# For linux terminal
source venv/bin/activate
```

3. Install the python dependencies
```
pip install -r requirements.txt
```

## Running server
Ensure virtual environment has been activated with dependencies installed
```
fastapi dev app.py
```

# Setup Frontend
Install node dependencies
```
cd frontend
npm i
```
## Running frontend application
Open application in browser at http://localhost:5173
```
npm run dev
```