import uuid
import os

from flask import Flask, jsonify, request
from flask.ext.sqlalchemy import SQLAlchemy


app = Flask(__name__)

app.config.setdefault('DEBUG', True)
app.config.setdefault('SECRET_KEY', 'hahahahahahahahahahahahahahahaha')
app.config.setdefault('SQLALCHEMY_DATABASE_URI', 'postgres://spectateur:aPassword@localhost/spectateur')
app.config.setdefault('SQLALCHEMY_TRACK_MODIFICATIONS', False)

if os.environ.get('DATABASE_URL'):
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')

if os.environ.get('SECRET_KEY'):
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

db = SQLAlchemy(app)


# --- Models --- #
class Report(db.Model):
    __tablename__ = 'reports'

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.String(36), unique=True)
    model = db.Column(db.Text)
    controller = db.Column(db.Text)

    def __init__(self, model, controller):
        self.model = model
        self.controller = controller
        self.uuid = str(uuid.uuid4())


# --- Views --- #
@app.route('/')
def home():
    return 'Hello, world!'


@app.route('/reports/<report_id>', methods=['GET'])
def get_report(report_id):
    report = Report.query.filter_by(uuid=report_id).first_or_404()
    return jsonify(
        model=report.model,
        controller=report.controller,
    )


@app.route('/reports', methods=['POST'])
def create_report():
    model = request.form.get('model', '')
    controller = request.form.get('controller', '')

    report = Report(model, controller)
    db.session.add(report)
    db.session.commit()

    return report.uuid


if __name__ == '__main__':
    app.run()
