const dns = require('dns')
dns.setDefaultResultOrder('ipv4first')

const { Pool } = require('pg')

// Map lowercase keys to their expected camelCase keys
const keyMap = {
  totalatlet: 'totalAtlet',
  totalpelatih: 'totalPelatih',
  totalwasit: 'totalWasit',
  totalprestasi: 'totalPrestasi',
  medaliemas: 'medaliEmas',
  medaliperak: 'medaliPerak',
  medaliperunggu: 'medaliPerunggu',
  totalcabor: 'totalCabor',
}

const isLocal = ['localhost', '127.0.0.1'].includes(process.env.DB_HOST || 'localhost');

const connectionConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
  : {
      host:     process.env.DB_HOST     || 'localhost',
      port:     process.env.DB_PORT     || 5432,
      user:     process.env.DB_USER     || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME     || 'postgres',
      ssl:      (!isLocal || process.env.DB_SSL === 'true') ? { rejectUnauthorized: false } : false
    }

const pool = new Pool(connectionConfig)

pool.connect()
  .then(client => {
    console.log('PostgreSQL connected successfully')
    client.release()
  })
  .catch(err => {
    console.error('PostgreSQL connection failed:', err.message)
  })

module.exports = {
  async query(sql, params) {
    // 1. Convert MySQL placeholders (?) to PostgreSQL placeholders ($1, $2, etc.)
    let index = 1
    const pgSql = sql.replace(/\?/g, () => `$${index++}`)

    // 2. Execute query
    const res = await pool.query(pgSql, params)

    // 3. Map keys for camelCase compatibility
    const mappedRows = res.rows.map(row => {
      const newRow = {}
      for (const key of Object.keys(row)) {
        const mappedKey = keyMap[key] || key
        newRow[mappedKey] = row[key]
      }
      return newRow
    })

    // 4. Return in [rows, fields] format for mysql2 compatibility
    return [mappedRows, res.fields]
  },
  
  async end() {
    await pool.end()
  }
}
