import React, { FC } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Invoice, TInvoice } from '../data/types'
import { useDebounce } from '@uidotdev/usehooks'
import InvoicePage from './InvoicePage'
import FileSaver from 'file-saver'

interface Props {
  data: Invoice
  setData(data: Invoice): void
}

const Download: FC<Props> = ({ data, setData }) => {
  const debounced = useDebounce(data, 500)

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return

    const file = e.target.files[0]
    file
      .text()
      .then((str: string) => {
        try {
          if (!(str.startsWith('{') && str.endsWith('}'))) {
            str = atob(str)
          }
          const d = JSON.parse(str)
          const dParsed = TInvoice.parse(d)
          console.info('parsed correctly')
          setData(dParsed)
        } catch (e) {
          console.error(e)
          return
        }
      })
      .catch((err) => console.error(err))
  }



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
