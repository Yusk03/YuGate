import { SetMetadata } from '@nestjs/common';

export const XML_RESPONSE_KEY = 'isXmlResponse';

export const XmlResponse = () => SetMetadata(XML_RESPONSE_KEY, true);
