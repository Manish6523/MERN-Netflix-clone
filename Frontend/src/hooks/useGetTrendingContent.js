import React, { useEffect, useState } from 'react'
import { useContentStore } from '../store/useContentStore.js'
import axios from 'axios'

const useGetTrendingContent = () => {
    const host = 'http://localhost:5000'
    const [trendingContent, setTrendingContent] = useState(null)
    const {contentType} = useContentStore()

    useEffect(() => {
        const getTrendingContent = async()=>{
            const res = await axios.get(`http://localhost:5000/api/v1/${contentType}/trending`,{withCredentials:true})
            setTrendingContent(res.data.content)
        }
        getTrendingContent()
    }, [contentType])

    return { trendingContent };
}

export default useGetTrendingContent
