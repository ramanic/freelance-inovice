import { FC } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Invoice } from '../data/types'
import { useDebounce } from '@uidotdev/usehooks'
import InvoicePage from './InvoicePage'

interface Props {
  data: Invoice
  setData(data: Invoice): void
}

const Download: FC<Props> = ({ data }) => {
  const debounced = useDebounce(data, 500)

  const title = data.name + '-invoice-' + data.invoiceDate
  return (
    <div style={{
      display: 'flex',
      marginBottom: '10px'
    }}>
      <PDFDownloadLink
        key="pdf"
        document={<InvoicePage pdfMode={true} data={debounced} />}
        fileName={`${title}.pdf`}
        aria-label="Save PDF"
        title="Save PDF"
        style={{
          color: 'black',
          display: 'flex',
          textDecoration: 'none',
          border: '1px solid black',
          padding: '5px',
          marginRight: '10px'

        }}
      >
        Export PDF
      </PDFDownloadLink>



    </div>
  )
}

export default Download
