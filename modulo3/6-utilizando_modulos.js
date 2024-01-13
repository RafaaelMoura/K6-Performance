//default
import http from 'k6/http';
//remote
import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.11.0/s3.js';
//local
import runTest from '/1-life_cicly';

export default function (){
    let res =http.get("http://test.k6.io");
    sleep(1);
}