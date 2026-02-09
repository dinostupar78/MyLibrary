const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const pgp = require('pg-promise')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require("./library");

db.one("SELECT 1")
    .then(() => console.log("✅ PostgreSQL connected"))
    .catch(err => console.error("❌ PostgreSQL error", err));