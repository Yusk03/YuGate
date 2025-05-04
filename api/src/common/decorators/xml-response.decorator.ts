import { SetMetadata } from '@nestjs/common';

export const XML_RESPONSE_KEY = 'isXmlResponse';

export interface XmlResponseOptions {
  rootName?: string;
  includeDeclaration?: boolean;
  encoding?: string;
}

export const XmlResponse = (options: XmlResponseOptions = {}) =>
  SetMetadata(XML_RESPONSE_KEY, options);
