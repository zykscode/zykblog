import readingTime from 'reading-time'
import { defineDocumentType, ComputedFields, makeSource } from 'contentlayer/source-files'
import {
    remarkExtractFrontmatter,
    remarkCodeTitles,
    remarkImgToJsx,
    extractTocHeadings,
  } from 'pliny/mdx-plugins/index.js'


const root = process.cwd()
const isProduction = process.env.NODE_ENV === 'production'

const computedFields:ComputedFields = {
    readTime: {type:'json', resolve:(doc)=> readingTime(doc.body.raw)},
    slug:{
        type:'string',
        resolve:(doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
    },
    path: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath,
      },
      filePath: {
        type: 'string',
        resolve: (doc) => doc._raw.sourceFilePath,
      },
      toc: { type: 'string', resolve: (doc) => extractTocHeadings(doc.body.raw) },
    
}
