import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const CobaPostman = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`https://apitest-reqruitment.qodrbee.com/api/packet/${id}`)
                const data = await response.json()
                setData(data.data)
                console.log(data.data)
            } catch (error) {
                console.log(error)
            }

        }
        getData()
    }, [])


    return (
        <>
            <div>
                {data.title}
            </div>
        </>
    )
}
export default CobaPostman