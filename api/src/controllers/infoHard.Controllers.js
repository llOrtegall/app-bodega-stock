import { connect } from '../connections/infoHardWare.js'

export const getHardWareByActivo = async (req, res) => {
  const { activo } = req.body
  try {
    const pool = connect()
      const [response] = await pool.query(`select * from accountinfo ac, hardware hr WHERE ac.TAG like '%${activo}%' and ac.HARDWARE_ID = hr.ID;`)
      return res.status(200).json(response)
    // return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

export const getHardWare = async (req, res) => {
 const { company } = req.params
  try {
    const pool = connect()
    if(company === 'Multired'){
      const [response] = await pool.query(`select * from accountinfo ac, hardware hr WHERE ac.TAG like '%Yumbo%' and ac.HARDWARE_ID = hr.ID;`)
      // const Filtered = response.map(syst => syst.OSNAME )
      // console.log(Filtered);
      return res.status(200).json(response)
    } else if (company === 'Servired'){
      const [response] = await pool.query(`select * from accountinfo ac, hardware hr WHERE ac.TAG like '%Jamundi%' and ac.HARDWARE_ID = hr.ID;`)
      // const Filtered = response.map(syst => syst.OSNAME )
      // console.log(Filtered);
      return res.status(200).json(response)
    }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json('Error al obtener la información de hardware')
  }
}