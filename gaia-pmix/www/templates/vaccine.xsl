<xsl:transform
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
  xmlns:prop="http://saxonica.com/ns/html-property"
  xmlns:style="http://saxonica.com/ns/html-style-property"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  exclude-result-prefixes="xs prop"
  extension-element-prefixes="ixsl"
  version="2.0"
  >
  
  <!-- This style sheet displays the books.xml file.  -->
  
  
  <xsl:template match="/">
        
    <xsl:result-document href="#title" method="ixsl:replace-content">
      <xsl:value-of>Results on <xsl:value-of select="format-date(current-date(), '[D] [MNn] [Y]')"/></xsl:value-of>
		<xsl:for-each select="ProvidersFullLookup/PharmaciesDetails"><xsl:value-of select="ProviderName"/></xsl:for-each>
    </xsl:result-document>    
    
  </xsl:template>  
  
</xsl:transform>	
