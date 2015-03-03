<xsl:transform
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:ixsl="http://saxonica.com/ns/interactiveXSLT"
  xmlns:prop="http://saxonica.com/ns/html-property"
  xmlns:style="http://saxonica.com/ns/html-style-property"
  xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:nc="http://niem.gov/niem/niem-core/2.0" 
  xmlns:pmix="http://xml.ijis.org/niem/2.0/" 
  xmlns:pmp="http://xml.ijis.org/niem/2.0/extension"  
  exclude-result-prefixes="xs prop"
  extension-element-prefixes="ixsl"
  version="2.0"
  >

	<xsl:template match="/">
		<xsl:result-document href="#title" method="ixsl:replace-content">
			<h2><xsl:value-of>Results on <xsl:value-of select="format-date(current-date(), '[D] [MNn] [Y]')"/></xsl:value-of></h2>
		</xsl:result-document>    
		<xsl:apply-templates select="pmix:PMPPrescriptionReport/pmp:RequestResponsePrescriptionReport/pmp:Prescription[1]/pmp:Patient"/>
		<xsl:apply-templates select="pmix:PMPPrescriptionReport/pmp:RequestResponsePrescriptionReport/pmp:Prescription"/>
	</xsl:template>
  
	<xsl:template match="pmp:Prescription">
		<xsl:result-document href="#prescriptions" method="ixsl:append-content">
			<h3>Prescription #: <xsl:value-of select="pmp:PrescriptionNumberText"/>(<xsl:value-of select="pmp:DrugRefillNumberCount"/>)</h3>
			<xsl:apply-templates select="pmp:PrescriptionDrug"/>
		</xsl:result-document>
	</xsl:template>
  
	<xsl:template match="pmp:Patient">
		<xsl:result-document href="#name" method="ixsl:replace-content">
			<div>Patient: <xsl:apply-templates select="nc:PersonName"/></div>
<!--	<nc:PersonSexCode>M</nc:PersonSexCode>
		<pmp:PersonUniqueSystemIdentifier><nc:IdentificationID>BB-234-09801</nc:IdentificationID></pmp:PersonUniqueSystemIdentifier> -->
		</xsl:result-document>
	</xsl:template>

	<xsl:template match="nc:PersonName">
		<xsl:value-of select="nc:PersonFullName"/> 
	</xsl:template>

	<xsl:template match="pmp:PrescriptionDrug">
		<div>Prescription:</div>
<!--	<xsl:apply-templates select="pmp:DrugUPCProductIdentifier"/> -->
		<div><xsl:value-of select="pmp:DrugProductNameText"/>
		(<xsl:value-of select="pmp:DrugStrengthText"/>)
		: <xsl:value-of select="pmp:DrugUnitOfMeasureText"/></div>
	</xsl:template>

	<xsl:template match="pmp:DrugUPCProductIdentifier">
		<div><xsl:value-of select="nc:IdentificationID"/></div>
	</xsl:template>
	
</xsl:transform>	
