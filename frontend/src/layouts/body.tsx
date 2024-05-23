import { Route, Routes } from 'react-router-dom'

import { Detail } from '../pages/Detail'
import { Home } from '../pages/home'
import { Search } from '../pages/search'

export const Body = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/search" element={<Search type="search" />}></Route>

      <Route path="/detail/:id" element={<Detail mediaType="movie" />}></Route>
    </Routes>
  )
}
