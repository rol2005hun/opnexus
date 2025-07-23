export const missionMetadata: Mission = {
    id: 'the-internal-leak',
    title: 'The Internal Leak',
    description: 'Nexus-Corp hired the DIA to investigate a suspected data breach. Working undercover as a new employee, discover who is leaking classified defense project information.',
    briefing: `
        <div class="classified-tag">CLASSIFIED</div>
        <div class="classified-tag">DIGITAL INVESTIGATION AGENCY</div>
        
        <h3>🕵️‍♂️ OPERATION: CORPORATE INFILTRATION</h3>

        <h4>📋 Mission Overview</h4>
        <p><span class="company">Nexus-Corp Industries</span>, a major defense contractor, contacted the DIA after discovering suspicious network activity suggesting internal data theft of their classified <strong>Sentinel-X project</strong>.</p>

        <h4>🎭 Your Cover</h4>
        <p>You are now employed as a <strong>junior analyst</strong> at <span class="company">Nexus-Corp</span>. Management believes you are a legitimate new hire. <span class="danger">Only the CEO knows your true identity.</span></p>

        <h4>🔐 Access Granted</h4>
        <ul>
            <li>All internal corporate email servers</li>
            <li>Company-wide chat systems and communications</li>
            <li>File access logs and security monitoring data</li>
        </ul>

        <h4>🎯 Objective</h4>
        <p>Analyze intercepted communications, identify the leak, and gather evidence of corporate espionage. The stolen data is worth <span class="money">$47M</span> and contains classified defense technology.</p>

        <h4>⚠️ Remember</h4>
        <p class="warning">Maintain your cover. <strong>Nobody can know you're DIA.</strong></p>
    `,
    thumbnail: '/missions/leak.jpg',
    difficulty: 'Rookie',
    estimatedTime: '30-50 mins',
    available: true,
    securityClearance: 1,
    icon: '🕵️‍♂️',
    price: 0
};