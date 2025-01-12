import React, { useState } from 'react';
import { uploadGenomeFile } from '../../services/api';
import type { AnalysisResult } from '../../types/results';

// smaple results for demo
const sampleResults: AnalysisResult[] = [
    {
        rsid: 'rs762551',
        traitName: 'Caffeine Metabolism (CYP1A2)',
        userGenotype: 'AC',
        interpretation: 'Moderate caffeine metabolizer',
        paper: {
          title: 'Caffeine, CYP1A2 Genotype, and Endurance Performance in... : Medicine & Science in Sports & Exercise',
          url: 'https://journals.lww.com/acsm-msse/Fulltext/2018/08000/Caffeine,_CYP1A2_Genotype,_and_Endurance.5.aspx'
        },
        summary: 'The research suggests that the effects of caffeine on performance can vary greatly between individuals, and this could be partly due to differences in how people metabolize caffeine. This variation might be influenced by genetic factors, specifically the CYP1A2 genotype, which is linked to caffeine metabolism.\n' +
          '\n' +
          'In the study, it was found that the performance effects of caffeine were not consistent even in cases where the study design, participants, and caffeine dose were similar. This inconsistency suggests that individual responses to caffeine can differ significantly, leading to different performance outcomes. In one trial, half of the subjects showed improvement with caffeine, while the other half showed a decline in performance when compared to a placebo.\n' +
          '\n' +
          'In the context of individuals with the AC genotype (SNP rs762551 - Caffeine Metabolism (CYP1A2)), this means that caffeine intake can have a varied impact on performance. As such, it is recommended that individuals with this genotype consider their personal response to caffeine when deciding on their caffeine consumption. Some may find that caffeine improves their performance, while others may experience the opposite effect. \n' +
          '\n' +
          'In conclusion, genetic variation, specifically in the CYP1A2 genotype, can influence how individuals metabolize caffeine, and this can have varying effects on performance. Therefore, personalized caffeine intake guidelines may be more beneficial for individuals with this genotype. \n' +
          '\n' +
          "Keep in mind that this is a complex issue and it might be beneficial to consult with a genetic counselor or healthcare provider to understand how one's specific genotype might affect caffeine metabolism and its potential impacts on health and performance."
      },
      {
        rsid: 'rs9939609',
        traitName: 'Body Weight Regulation (FTO)',
        userGenotype: 'AT',
        interpretation: 'Moderate likelihood of weight gain',
        paper: {
          title: 'Minor alleles in the FTO SNPs contributed to the increased risk of obesity among Korean adults: meta-analysis from nationwide big data-based studies',
          url: 'https://pubmed.ncbi.nlm.nih.gov/36777800'
        },
        summary: 'The latest research on the FTO gene and weight management suggests that certain variants in the FTO gene can significantly increase the risk of obesity. This is particularly true for Korean adults, but the findings may have broader implications.\n' +
          '\n' +
          'In simple terms, your genes can play a part in determining your body weight. Specifically, people who have the AT variation of the FTO gene (identified as SNP rs9939609) may have a higher likelihood of gaining weight. This is important for individuals who have been identified as having a moderate likelihood of weight gain, as they may be at an even higher risk if they also have this specific gene variation.\n' +
          '\n' +
          "For practical advice, it's important to remember that genetic factors are just one part of the equation when it comes to weight management. A balanced diet and regular physical activity remain essential in managing your weight, regardless of your genetic make-up. However, if you know you carry the AT variation, you might benefit from additional weight management strategies, such as more frequent monitoring of your weight or a more personalised diet and exercise plan.\n" +
          '\n' +
          'It should be noted, however, that the study used Body Mass Index (BMI) as a measure of obesity. Although widely used, BMI does not account for muscle mass and may not be a perfect measure of body fat.\n' +
          '\n' +
          "This research highlights the role genetics can play in weight management, but it's just one piece of the puzzle. It's always recommended to consult with a healthcare professional for personalized advice."
      },
      {
        rsid: 'rs1801282',
        traitName: 'Insulin Sensitivity (PPARG Pro12Ala)',
        userGenotype: 'CC',
        interpretation: 'Reduced insulin sensitivity',
        paper: {
          title: 'Sex-dimorphic genetic effects and novel loci for fasting glucose and insulin variability',
          url: 'https://www.nature.com/articles/s41467-020-19366-9'
        },
        summary: 'The latest research indicates that genetic factors can have different effects on insulin sensitivity depending on sex. Particularly, the study found that in women, fasting insulin levels have a stronger genetic correlation with waist-to-hip ratio and anorexia nervosa, compared to men. The waist-to-hip ratio in women is also causally linked to insulin resistance, which is not the case in men.\n' +
          '\n' +
          'This research suggests that maintaining a healthy waist-to-hip ratio could be important for improving insulin sensitivity in women, especially those with the CC genotype (SNP rs1801282 - Insulin Sensitivity (PPARG Pro12Ala)).\n' +
          '\n' +
          'In terms of actionable advice, it would be recommended for women with this genotype to maintain a balanced diet and regular exercise routine to manage their waist-to-hip ratio and thereby possibly improve their insulin sensitivity. Always consult with a healthcare provider before starting any new health regime.'
      },
      {
        rsid: 'rs9930506',
        traitName: 'Leptin Sensitivity (LEPR)',
        userGenotype: 'AG',
        interpretation: 'Moderate leptin resistance',
        paper: {
          title: 'The Leptin System and Diet: A Mini Review of the Current Evidence',
          url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8651558/'
        },
        summary: 'The latest research suggests that dietary interventions can play a significant role in addressing leptin resistance, which is related to obesity. Particularly, diets that are high in fats, carbohydrates, fructose, and sucrose, and low in protein have been identified as contributing factors to leptin resistance. This is relevant for individuals with moderate leptin resistance and AG genotype (SNP rs9930506 - Leptin Sensitivity (LEPR)).\n' +
          '\n' +
          "Leptin is a hormone that helps regulate your body's energy balance by inhibiting hunger. If you are leptin resistant, your body may not respond to leptin in a normal way, leading to a potential overeating and weight gain.\n" +
          '\n' +
          "To counter leptin resistance, evidence from the studies suggests that energy-restricted diets can reduce levels of leptin and potentially reverse leptin resistance in the long term. An energy-restricted diet means consuming fewer calories than your body uses for energy. It's important to note that while these findings are promising, the research has some limitations. For instance, there's no universally accepted definition of leptin resistance or a reliable way to measure it in humans.\n" +
          '\n' +
          'In terms of practical, actionable advice, try to maintain a balanced diet and avoid foods high in fat, carbohydrates, fructose, and sucrose. Increase your protein intake and consider a diet that restricts your calorie intake. Regular exercise can also help manage weight and improve leptin sensitivity. Always consult with a healthcare provider before starting a new diet or fitness regimen.'
      },
      {
        rsid: 'rs17782313',
        traitName: 'MC4R and Appetite Regulation',
        userGenotype: 'TT',
        interpretation: 'Increased appetite and obesity risk',
        paper: {
          title: 'The genomics of childhood eating behaviors',
          url: 'https://www.nature.com/articles/s41562-020-01019-y'
        },
        summary: 'The latest research on the genomics of childhood eating behaviors indicates that there is a link between certain genetic variants and body mass index (BMI), which can affect eating habits. Specifically, an increase in BMI-PGS, a score that predicts the genetic risk for obesity, was linked to a 20% decrease in risk of persistent undereating and a 15% decrease in risk of persistent fussy eating. \n' +
          '\n' +
          "This study suggests that the way children eat may be influenced by the same genetic variants that affect BMI, supporting the theory that certain behaviors related to obesity may be genetically influenced. However, the research didn't find a significant connection between AN-PGS, a genetic score related to anorexia nervosa, and eating behavior trajectories.\n" +
          '\n' +
          'In the context of the specific genotype TT (SNP rs17782313 - MC4R and Appetite Regulation), although this study did not directly address it, the general findings underline the role genetics play in eating behaviors and obesity risk. \n' +
          '\n' +
          "For individuals with increased appetite and risk of obesity, mindful eating and portion control strategies could be especially beneficial. Mindful eating involves paying close attention to what and when you're eating, helping to reduce overeating and emotional eating. Portion control is also crucial for maintaining a healthy weight, as it helps to ensure that you're not consuming too many calories. \n" +
          '\n' +
          'Remember, genetics may play a role, but lifestyle changes can also have a significant impact on managing your weight and health. Consulting a healthcare provider or a dietitian could provide further personalized advice and strategies.'
      },
      {
        rsid: 'rs7412',
        traitName: 'Cholesterol Metabolism (APOE E2)',
        userGenotype: 'CC',
        interpretation: 'Lower typical LDL cholesterol levels',
        paper: {
          title: 'APOE Genotype Disclosure and Lifestyle Advice in a Randomized Intervention Study with Finnish Participants',
          url: 'https://academic.oup.com/jn/article/151/1/85/5981720'
        },
        summary: 'The study titled "APOE Genotype Disclosure and Lifestyle Advice in a Randomized Intervention Study with Finnish Participants" explored the impact of disclosing APOE genotypes to participants and giving them diet and lifestyle advice based on their genotype. The research found that individuals with the ε4 variant who underwent dietary counseling showed improvements in their dietary fat quality, waist circumference, and blood triglyceride values. \n' +
          '\n' +
          'Remarkably, these improvements persisted even after the counseling stopped, and were still observable 6.5 years later. This suggests that providing individuals with information about their genetic risk can have long-term positive effects on their health. However, the study also noted that more research is needed to determine whether personalized genotype-based advice is more effective than general lifestyle guidance.\n' +
          '\n' +
          "In terms of actionable advice, if you carry the APOE ε4 variant, you may benefit from tailored dietary counseling. It's also suggested that understanding your genetic risk could motivate you to maintain a healthier lifestyle in the long run. Although this study did not specifically target the CC genotype of SNP rs7412, it highlights the potential benefits of personalized dietary advice based on one's genetic makeup."
      },
      {
        rsid: 'rs4149056',
        traitName: 'Statin Metabolism (SLCO1B1)',
        userGenotype: 'TT',
        interpretation: 'Typical statin metabolism',
        paper: {
          title: 'Personalized treatment options for chronic diseases using precision cohort analytics',
          url: 'https://www.nature.com/articles/s41598-021-80967-5'
        },
        summary: 'The latest research emphasizes the importance of personalized treatment plans, especially for chronic diseases. This approach uses a new data-analytic workflow to create models that can generate personalized treatment insights for each patient.\n' +
          '\n' +
          'These models consider both well-established treatment guidelines and real-world evidence from Electronic Health Record (EHR) data. This method allows physicians to incorporate the most relevant and up-to-date information when choosing treatment options for individual patients.\n' +
          '\n' +
          "In the context of managing cholesterol levels for people with the TT genotype (SNP rs4149056 - Statin Metabolism (SLCO1B1)), who typically have standard statin metabolism, this personalized approach would mean a healthcare provider could potentially use a combination of established cholesterol management guidelines and the patient's unique health data. This would facilitate a more precise and tailored approach to prescribing statin medication, and managing cholesterol levels overall. \n" +
          '\n' +
          "It's recommended that individuals with this specific genetic profile engage with their healthcare providers to discuss the possibility of using this personalized approach to managing their cholesterol levels. This may lead to more effective and individualized treatment plans, potentially boosting the efficacy of statin medications and overall health outcomes."
      },
      {
        rsid: 'rs671',
        traitName: 'Alcohol Flush Reaction (ALDH2)',
        userGenotype: 'GG',
        interpretation: 'Typical ALDH2 enzyme activity',
        paper: {
          title: 'Ethnic Differences in Serum Levels of microRNAs Potentially Regulating Alcohol Dehydrogenase 1B and Aldehyde Dehydrogenase 2',
          url: 'https://www.mdpi.com/2077-0383/10/16/3678/pdf'
        },
        summary: 'The research highlights the role of microRNAs (miRNAs) in regulating the expression of the ALDH2 enzyme, which is crucial for metabolizing alcohol. This study found that miR-34a, a type of miRNA, was able to reduce the activity of the ALDH2 enzyme in particular cell types. \n' +
          '\n' +
          'For individuals with the GG genotype of SNP rs671 that typically have normal ALDH2 enzyme activity, this could have implications for alcohol flush reaction. If the activity of the ALDH2 enzyme is reduced, it may lead to a buildup of the toxic byproduct acetaldehyde, which causes flushing, or redness of the skin, after drinking alcohol. \n' +
          '\n' +
          "There's also evidence that miR-1301-3p can suppress another alcohol-processing enzyme ADH6, while miR-148a-3p can promote the expression of ADH4. However, no miRNAs have been found to regulate the expression of ADH1B.\n" +
          '\n' +
          "Taking these findings into account, people with this genotype may want to consider ways to manage their alcohol intake to prevent flushing and associated risks. Although the research doesn't provide specific advice on how to do this, it's generally recommended to moderate alcohol consumption, drink plenty of water, and avoid drinking on an empty stomach. \n" +
          '\n' +
          'Further research is needed to understand the potential of using miRNAs as a therapeutic tool to regulate ALDH2 and ADH enzymes and manage alcohol flush reaction and other alcohol-related risks.'
      },
      {
        rsid: 'rs662799',
        traitName: 'Triglyceride Levels (APOA5)',
        userGenotype: 'GG',
        interpretation: 'Higher typical triglycerides',
        paper: {
          title: 'Association between triglycerides, known risk SNVs and conserved rare variation in SLC25A40 in a multi-ancestry cohort',
          url: 'https://bmcmedgenomics.biomedcentral.com/articles/10.1186/s12920-020-00854-2'
        },
        summary: 'The study titled "Association between triglycerides, known risk SNVs and conserved rare variation in SLC25A40 in a multi-ancestry cohort" did not provide specific information about diet tips for managing triglycerides based on the APOA5 genotype for individuals with higher typical triglycerides, specifically those with genotype GG (SNP rs662799 - Triglyceride Levels (APOA5)). \n' +
          '\n' +
          'The research attempted to establish connections between certain genetic variations and triglyceride levels, but the findings were inconclusive due to challenges such as limited sample size and missing drug information. \n' +
          '\n' +
          "Therefore, actionable advice on diet tips for managing triglycerides based on the APOA5 genotype GG cannot be provided from this study. It's recommended to seek personalized advice from a healthcare professional who can consider your unique genetic makeup and overall health. As a general rule, a healthy diet low in saturated fats and sugars, combined with regular exercise, can contribute positively to managing triglyceride levels."
      }
    ]


interface FileUploadProps {
    onUploadSuccess: (results: AnalysisResult[]) => void;
}

// drag and drop file upload
const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isViewingSample, setIsViewingSample] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragIn = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragOut = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    // upload file and get results
    const handleAnalyze = async () => {
        if (selectedFile) {
            try {
                setIsAnalyzing(true);
                const results = await uploadGenomeFile(selectedFile);
                onUploadSuccess(results);
            } catch (error) {
                console.error('Upload failed:', error);
            } finally {
                setIsAnalyzing(false);
            }
        }
    };

    const handleViewSample = () => {
        setIsViewingSample(true);
        onUploadSuccess(sampleResults);
    };

    const handleBack = () => {
        setIsViewingSample(false);
        onUploadSuccess([]);
    };

    if (isViewingSample) {
        return (
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={handleBack}
                    className="flex items-center text-[#254bf1] hover:text-[#254bf1]/80 mb-6"
                >
                    <svg 
                        className="w-5 h-5 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    Back to Upload
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div 
                className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg transition-colors ${
                    isDragging ? 'border-brand-default bg-brand-fainter' : 'border-gray-300 hover:border-brand-default'
                }`}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                style={{ minHeight: '200px' }}
            >
                <div className="text-center space-y-4">
                    <svg 
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor" 
                        fill="none" 
                        viewBox="0 0 48 48" 
                        aria-hidden="true"
                    >
                        <path 
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div className="text-lg">
                        <label className="relative cursor-pointer rounded-md font-medium text-brand-default hover:text-brand-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-default">
                            <span>Upload a file</span>
                            <input 
                                type="file"
                                className="sr-only"
                                onChange={handleFileChange}
                                accept=".txt"
                            />
                        </label>
                        <span className="text-gray-500"> or drag and drop</span>
                    </div>
                    <p className="text-sm text-gray-500">
                        TXT 23andMe files only
                    </p>
                </div>
            </div>

            <div className="text-center space-y-4">
                {selectedFile && (
                    <p className="text-lg text-gray-700">
                        Selected file: <span className="font-medium">{selectedFile.name}</span>
                    </p>
                )}
                <button
                    onClick={handleAnalyze}
                    disabled={!selectedFile || isAnalyzing}
                    className={`w-full py-3 px-4 text-white text-center rounded transition-colors ${
                        selectedFile && !isAnalyzing
                            ? 'cursor-pointer hover:opacity-90' 
                            : 'cursor-not-allowed opacity-90'
                    }`}
                    style={{ backgroundColor: '#254bf1' }}
                >
                    {isAnalyzing ? (
                        <div className="flex items-center justify-center space-x-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Analyzing...</span>
                        </div>
                    ) : (
                        'Analyze Data'
                    )}
                </button>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4">
            {/* <button className="w-full min-h-[50px] px-2 py-2 text-white font-semibold rounded-sm bg-[#254bf1] ring-2 ring-[#254bf1] hover:bg-[#254bf1]/90">
                    Analyze Your Results
                </button> */}
                <button
                    onClick={handleViewSample}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                    or view ahsan's data
                </button>
            </div>
        </div>
    );
};

export default FileUpload; 