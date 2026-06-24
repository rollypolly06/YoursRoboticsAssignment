# Fleet Ops Console Backend

## Setting up
Version of Python 3.10+

1. Set up a virtual environment
```
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