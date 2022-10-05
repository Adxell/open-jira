import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import type { NextPage } from 'next'
import { Layout } from '../components/layouts/';
import { EntryList, NewEntry } from '../components/ui/';

const Home: NextPage = () => {
  return (  
    <Layout title='Home - OpenJira'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title="Pendientes"/>
            <CardContent>
              {/* Agregar una nueva targeta */}
              <NewEntry />
              <EntryList status='pending'/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title="En progeso"/>
            <CardContent>
              {/* Agregar una nueva targeta */}
              <EntryList status='in-progress'/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{height: 'calc(100vh - 100px)'}}>
            <CardHeader title="Completadas"/>
            <CardContent>
              {/* Agregar una nueva targeta */}
              <EntryList status='finished'/>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Home
