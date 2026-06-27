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

## Directory Structure
```
root/
├── README.md            # how to run it from a clean clone
├── DECISIONS.md         # assumptions, definitions, trade-offs, what you cut, known issues
├── RND_MEMO.md          # ≤1 page: the capability you'd build next + who pays for it
├── WALKTHROUGH.zip      # Extract the .zip file to view the walkthrough video 
├── summary.json         # machine-readable results
├── data/                # Data .csv files
├── backend/             # Backend API
└── frontend/            # Frontend Application
```