pipeline {
    agent any
    
    stages {
        stage('Build Client') {
            steps {
                dir('client') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Build Server') {
            steps {
                dir('server') {
                    sh 'pip install --no-cache-dir -r requirements.txt'
                }
            }
        }
        stage('Build Worker') {
            steps {
                dir('worker') {
                    sh 'pip install --no-cache-dir -r requirements.txt'
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker-compose -f docker-compose.yml up --build -d'
            }
        }
    }
}
