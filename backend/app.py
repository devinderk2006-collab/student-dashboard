from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import re
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

database_url = os.getenv('DATABASE_URL')
if database_url and database_url.startswith('postgres://'):
    database_url = database_url.replace('postgres://', 'postgresql://', 1)
app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

db = SQLAlchemy(app)

# Models
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(255))
    role = db.Column(db.String(20))

class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    roll_no = db.Column(db.String(20))
    branch = db.Column(db.String(100))
    year = db.Column(db.String(20))
    cgpa = db.Column(db.Float)
    attendance = db.Column(db.Integer)

class Subject(db.Model):
    __tablename__ = 'subjects'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    name = db.Column(db.String(100))
    grade = db.Column(db.String(5))
    score = db.Column(db.Float)
    semester = db.Column(db.Integer)
    assignments = db.Column(db.Integer)
    exams = db.Column(db.Integer)
    practical = db.Column(db.Integer)

# Routes
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email, password=password).first()
    
    if not user:
        return jsonify({'error': 'Invalid email or password'}), 401

    response = {
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'role': user.role
    }

    if user.role == 'student':
        student = Student.query.filter_by(user_id=user.id).first()
        if student:
            response['student_id'] = student.id
            response['roll_no'] = student.roll_no
            response['cgpa'] = student.cgpa
            response['attendance'] = student.attendance
            response['branch'] = student.branch
            response['year'] = student.year

    return jsonify(response), 200


@app.route('/api/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    result = []
    for s in students:
        user = User.query.get(s.user_id)
        result.append({
            'id': s.id,
            'name': user.name if user else '',
            'email': user.email if user else '',
            'roll_no': s.roll_no,
            'branch': s.branch,
            'year': s.year,
            'cgpa': s.cgpa,
            'attendance': s.attendance
        })
    return jsonify(result), 200


@app.route('/api/students/<int:student_id>/subjects', methods=['GET'])
def get_subjects(student_id):
    subjects = Subject.query.filter_by(student_id=student_id).all()
    result = []
    for s in subjects:
        result.append({
            'id': s.id,
            'name': s.name,
            'grade': s.grade,
            'score': s.score,
            'semester': s.semester,
            'assignments': s.assignments,
            'exams': s.exams,
            'practical': s.practical
        })
    return jsonify(result), 200


@app.route('/api/students', methods=['POST'])
def add_student():
    data = request.json
    
    new_user = User(
        name=data['name'],
        email=data['email'],
        password=data['password'],
        role='student'
    )
    db.session.add(new_user)
    db.session.flush()

    new_student = Student(
        user_id=new_user.id,
        roll_no=data['roll_no'],
        branch=data['branch'],
        year=data['year'],
        cgpa=data['cgpa'],
        attendance=data['attendance']
    )
    db.session.add(new_student)
    db.session.commit()

    return jsonify({'message': 'Student added successfully'}), 201


@app.route('/api/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    student = Student.query.get(student_id)
    if not student:
        return jsonify({'error': 'Student not found'}), 404
    
    Subject.query.filter_by(student_id=student_id).delete()
    db.session.delete(student)
    db.session.commit()
    
    return jsonify({'message': 'Student deleted'}), 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)